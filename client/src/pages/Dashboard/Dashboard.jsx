import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
//
import Input from "../../components/Input/Input";
import fieldSchema from "../../Utils/fieldSchema.json";
import { getData, updateUserData } from "../../Redux/Data/DataActions";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../Redux/UserAuth/AuthActions";
import { connect } from "react-redux";
import _ from "lodash";

const Dashboard = ({ getData, updateUserData, data, logOut }) => {
  const [isEdit, setEdit] = useState(false);
  const [userData, setUserData] = useState({});

  const [hasDataChanged, setDataChanged] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setDataChanged(!_.isEqual(userData, data));
  }, [userData, data]);

  const updateData = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      ...(name === "first" || name === "last"
        ? { name: { ...prev.name, [name]: value } }
        : { [name]: value }),
    }));
  };

  useEffect(() => {
    setUserData(data);
  }, [data]);

  const getValue = (name) => {
    if (name === "first" || name === "last") {
      return userData?.name?.[name] ?? "";
    }
    return userData?.[name] ?? "";
  };

  const { first = "", last = "" } = data?.name || {};

  const navigate = useNavigate();

  const logOutHandler = () => {
    logOut();
    navigate("login");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    updateUserData(userData);
    setEdit(false);
    setDataChanged(false);
  };

  const undoHandler = () => {
    setEdit(false);
    setUserData(data);
  };

  return (
    <div className={styles.dashboard}>
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.balanceCard}>
          <button className={styles.logOutBtn} onClick={logOutHandler}>
            Log Out
          </button>
          <img className={styles.userImg} src={data?.picture} alt="user" />
          <p className={styles.name}>{`${first} ${last}`.trim()}</p>
          <div className={styles.balanceEditPanel}>
            <div className={styles.balance}>
              <span className={styles.bLabel}>Current Balance</span>
              <span className={styles.amount}>{data?.balance || "$ 0.00"}</span>
            </div>
            {isEdit ? (
              <div className={styles.btnsContainer}>
                <button
                  type="submit"
                  className={`${styles.saveBtn} ${styles.editBtn}`}
                  disabled={!hasDataChanged}
                >
                  Save Changes
                </button>
                <button
                  type="reset"
                  onClick={undoHandler}
                  className={`${styles.backBtn} ${styles.editBtn}`}
                >
                  Go Back
                </button>
              </div>
            ) : (
              <button onClick={() => setEdit(true)} className={styles.editBtn}>
                Edit Info
              </button>
            )}
          </div>
        </div>
        <div className={styles.infoCard}>
          {Object.entries(fieldSchema).map(([name, field]) => (
            <Input
              key={name}
              value={getValue(name)}
              label={field.label}
              placeholder={field.placeholder}
              inputType={field.type}
              isDisabled={isEdit}
              maxLength={field.maxLength}
              onChange={updateData}
              name={name}
            />
          ))}
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.dataReducer.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData: () => dispatch(getData()),
    logOut: () => dispatch(logOut()),
    updateUserData: (data) => dispatch(updateUserData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
