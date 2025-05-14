import "../../styles/admin.css";
const Tables = () => {
  return (
    <div id="container">
      <div id="banner">
        <h1>All Tables</h1>
      </div>

      <div id="add-form">
        <input type="text" placeholder="Enter Table Name"/>
        <input type="text" placeholder="Enter Table Password"/>
        <button>Add Table</button>
      </div>

      <div id="table-container">
        <table>
          <thead>
            <tr>
              <th>table name</th>
              <th>role</th>
              <th>role</th>
              <th>isActive</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {Array(10)
              .fill()
              .map(() => (
                <tr>
                  <td>table name</td>
                  <td>role</td>
                  <td>role</td>
                  <td>isActive</td>
                  <td>Operation</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tables;
