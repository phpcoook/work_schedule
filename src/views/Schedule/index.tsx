import React from "react";
import { Layout } from "antd";
import { useDispatch } from "react-redux";
import { Header as CustomHeader, VerticalMenu, ScheduleList, ScheduleControls, TeamWorkSchedule  } from "../../components";
import { Row, Col } from "antd";
import { startPopulateWorkSchedules } from "../../actions/workSchedules";
import { fetchAllUsers } from "../../actions/users";
import { fetchAllChangeLogs } from "../../actions/changeLog";
import { updateSelectedDay } from "../../actions/calendar"

const { Header, Content, Sider } = Layout;

const Schedule = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(startPopulateWorkSchedules());
    dispatch(fetchAllUsers());
    dispatch(fetchAllChangeLogs());
    dispatch(updateSelectedDay(new Date().toISOString().slice(0, 10)))
  }, [dispatch]);

  return (
      <Layout>
        <Header>
          <CustomHeader />
        </Header>
        <Layout>
          <Sider>
            <VerticalMenu />
          </Sider>
          <Content className="Schedule__content">
            <Row>
              <Col span={12}>
                <ScheduleControls />
                <ScheduleList />
              </Col>
              <Col span={12}>
                <TeamWorkSchedule />
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
  );
};

export default Schedule;
