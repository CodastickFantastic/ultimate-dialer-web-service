export default function ShowListFeedbackRow(props) {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.feedback}</td>
      <td>{props.called}</td>
      <td>{props.number}</td>
      {/* <td>{props.note}</td> */}
    </tr>
  );
}
