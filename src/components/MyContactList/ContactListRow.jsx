export default function ContactListRow(props) {
  return (
    <tr>
      <td>{props.date}</td>
      <td>{props.listName}</td>
      <td>{props.doneCalls}</td>
      <td>{props.totalCalls}</td>
      <td className="deleteContactList" onClick={props.deleteList}>Delete</td>
    </tr>
  );
}
