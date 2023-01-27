import "./ShowListResult.css";

function ShowListResult() {
  return (
    <section className="showListResult">
      <h2>List Results</h2>
      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Number/Mail</th>
              <th>Feedback</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                05/January/2023 <br />
                00:09:24
              </td>
              <td>Jakub Wojtysiak</td>
              <td>
                501721417 <br /> it.jakub.wojtysiak@gmail.com
              </td>
              <td>Called</td>
              <td>Likes Bananas and Strowberries</td>
            </tr>
            <tr>
              <td>
                05/January/2023 <br />
                00:09:24
              </td>
              <td>Jakub Wojtysiak</td>
              <td>
                501721417 <br /> it.jakub.wojtysiak@gmail.com
              </td>
              <td>Called</td>
              <td>Likes Bananas and Strowberries</td>
            </tr>
            <tr>
              <td>
                05/January/2023 <br />
                00:09:24
              </td>
              <td>Jakub Wojtysiak</td>
              <td>
                501721417 <br /> it.jakub.wojtysiak@gmail.com
              </td>
              <td>Called</td>
              <td>Likes Bananas and Strowberries</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ShowListResult;
