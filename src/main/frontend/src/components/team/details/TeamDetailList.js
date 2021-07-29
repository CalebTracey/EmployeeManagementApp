import React, { useState } from 'react';
import QueueAnim from 'rc-queue-anim';
import { useDispatch } from 'react-redux';
import { Result, Button, message } from 'antd';
import api from '../../../apis/api';
import './TeamDetails.css';
import TeamDetailItemContainer from './TeamDetailItemContainer';
import allActions from '../../../redux/actions/index';

const TeamDetailList = ({
  team,
  setShowModal,
  handlePopCancel,
  hidePopConfirm,
  confirmLoading,
}) => {
  const [mapState, setMapState] = useState(team.employees);
  const dispatch = useDispatch();
  const success = (text) => {
    message.success(text);
  };

  const handleRemoveTeamMember = (employee, teamFrom) => {
    const filter = teamFrom.employees.filter((e) => e.id !== employee.id);
    const updatedTeam = {
      teamName: teamFrom.teamName,
      id: teamFrom.id,
      employees: filter,
      // tasks: teamFrom.tasks,
    };
    setMapState(updatedTeam.employees);
    dispatch(allActions.employees.employeeDeleted(employee.id));
    api.delete(`employees/${employee.id}`);
    success(`${employee.firstName} ${employee.lastName} removed from ${teamFrom.teamName}`);
  };

  const teamList = () => {
    return team.employees.map((e) => {
      return (
        <div key={e.id}>
          <TeamDetailItemContainer
            team={team}
            key={e.id}
            employee={e}
            setShowModal={setShowModal}
            handleRemoveTeamMember={handleRemoveTeamMember}
            handlePopCancel={handlePopCancel}
            hidePopConfirm={hidePopConfirm}
            confirmLoading={confirmLoading}
          />
        </div>
      );
    });
  };

  const teamListContainer =
    mapState.length === 0 ? (
      <Result
        key={team.teamName}
        title={`${team.teamName} has no members.`}
        extra={
          <Button type="primary" key="console">
            {' '}
            Add Members{' '}
          </Button>
        }
      />
    ) : (
      teamList()
    );

  return (
    <QueueAnim key="nodeMap" type={['right', 'left']} leaveReverse>
      {teamListContainer}
    </QueueAnim>
  );
};

export default TeamDetailList;