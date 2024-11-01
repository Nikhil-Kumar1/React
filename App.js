/* <div id='parent'>
    <div>
      <h1>This is h11 tag</h1>
    </div>
</div> */

const parent = React.createElement(
  "div",
  { id: "parent" },
  React.createElement("div", {}, [
    React.createElement("h1", {}, "This is h1 tag"),
    React.createElement("h2", {}, "This is h2 tag"),
  ])
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(parent);
