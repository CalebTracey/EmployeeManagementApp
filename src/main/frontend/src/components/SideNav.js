import React, { Suspense, useState } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import {
    UserOutlined,
    HomeOutlined,
    TeamOutlined,
    PlusOutlined
} from '@ant-design/icons';
import Employees from '../containers/Employees';

const { Sider } = Layout;
const { SubMenu } = Menu;

const SideNav = ({ collapsed }) => {
    const [employeeState, setEmployeeState] = useState(null);

    const employees = () => {
        return (
        <Suspense fallback="Loading...">
            <Employees />
        </Suspense>
        )
    }
    return (
        <Sider trigger={null} collapsible collapsed={collapsed} style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: '0px',
            flex: '0 0 200px',
            maxWidth: '200px',
            minWidth: '200px',
            width: '200px'

        }}>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="inline" >
                <Menu.Item
                    key="home"
                    icon={<HomeOutlined />}>
                    <div>Home</div>
                    <NavLink
                        key="home-nav"
                        to="/" />
                </Menu.Item>
                <SubMenu
                    key="sub1"
                    icon={<UserOutlined />}
                    title="Employees"
                    onTitleClick={() => setEmployeeState(employees)}
                >
                    <Menu.Item
                        key="add-employee"
                        icon={<PlusOutlined />}>
                        Add Employee
                <NavLink
                            key="employeeaddnav"
                            to={'/addemployee'} />
                    </Menu.Item>
                    {employeeState}
                </SubMenu>
                <SubMenu
                    key="sub2"
                    icon={<TeamOutlined />}
                    title="Teams">
                    <Menu.Item
                        key="create-team"
                        icon={<PlusOutlined />}>
                        Create Team
                        <NavLink to={'/createteam'} />
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
    );
};

export default SideNav;