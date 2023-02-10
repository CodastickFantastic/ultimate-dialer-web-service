import { useContext } from "react";
import CallHistoryWidget from "../components/Dashboard/CallHistoryWidget/CallHistoryWidget";
import DownloadAppWidget from "../components/Dashboard/DownloadAppWidget/DownloadAppWidget";
import HelloWidget from "../components/Dashboard/HelloWidget/HelloWidget";
import StatisticsWidget from "../components/Dashboard/StatisticWidget/StatisticsWidget";

import DataBaseContext from "../utility/contexts/DataBaseContext";

export default function Dashboard(props) {
  const { userDataBase } = useContext(DataBaseContext);

  return (
    <section className="dashboard">
      <section className="section">
        <HelloWidget name={props.user.displayName} />
        <DownloadAppWidget />
      </section>
      {userDataBase && (
        <section className="section">
          <StatisticsWidget
            name="Total Answered Calls"
            stats={userDataBase.stats.totalAnsweredCalls}
          />
          <StatisticsWidget
            name="Total Done Calls"
            stats={userDataBase.stats.totalDoneCalls}
            style="noStyle"
          />
          <StatisticsWidget
            name="Total Leads"
            stats={userDataBase.stats.totalLeads}
          />
        </section>
      )}
      {userDataBase && (
        <section className="section">
          <CallHistoryWidget />
        </section>
      )}
    </section>
  );
}
