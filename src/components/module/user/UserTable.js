import { ActionDelete, ActionEdit } from "components/action";
import { LabelStatus } from "components/label";
import { Table } from "components/table";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot } from "firebase/firestore";
import React from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userRoles, userStatus } from "utils/constants";

const UserTable = () => {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const colRef = collection(db, "users");
    onSnapshot(colRef, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUserList(results);
    });
  }, []);
  const renderLabelStatus = (status) => {
    switch (status) {
      case userStatus.ACTIVE:
        return <LabelStatus type="success">Active</LabelStatus>;
      case userStatus.PENDING:
        return <LabelStatus type="warning">Pending</LabelStatus>;
      case userStatus.BANNED:
        return <LabelStatus type="danger">Banned</LabelStatus>;
      default:
        break;
    }
  };
  const renderRoleLabel = (role) => {
    switch (role) {
      case userRoles.ADMIN:
        return "Admin";
      case userRoles.MOD:
        return "Moderator";
      case userRoles.USER:
        return "User";

      default:
        break;
    }
  };

  const renderUserItem = (user) => {
    return (
      <tr key={user.id}>
        <td title={user.id}>{user.id.slice(0, 5) + "..."} </td>
        <td>
          <div className="flex items-center gap-x-3">
            <img
              className="flex-shrink-0 object-cover w-10 h-10 rounded-md"
              src={user?.avatar}
              alt="Avatar"
            />
            <div className="flex-1">
              <h3>{user?.fullname}</h3>
              <time className="text-sm text-gray-300">
                {new Date(user?.createdAt?.seconds * 1000).toLocaleDateString(
                  "vi-Vi"
                )}
              </time>
            </div>
          </div>
        </td>
        <td>{user?.username}</td>
        <td title={user?.email}>{user?.email.slice(0, 7) + "..."}</td>
        <td>{renderLabelStatus(Number(user.status))}</td>
        <td>{renderRoleLabel(Number(user.role))}</td>
        <td>
          <div className="flex items-center gap-x-3">
            <ActionEdit
              onClick={() => navigate(`/manage/update-user?id=${user.id}`)}
            ></ActionEdit>
            <ActionDelete
            //   onClick={() => handleDeleteCategory(category.id)}
            ></ActionDelete>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Info</th>
            <th>Username</th>
            <th>Email Address</th>
            <th>Status</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userList.length > 0 && userList.map((user) => renderUserItem(user))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;
