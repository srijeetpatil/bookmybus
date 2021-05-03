import styles from "../../styles/Localtravel.module.css";

function MarkerPopup(props) {
  let rate;
  let routes = props.routes.map((r) => {
    return (
      <div>
        -{r}
        <br />
      </div>
    );
  });
  if (props.rate != "NA") {
    rate = props.rate;
  }
  return (
    <div className={styles.marker_popup}>
      {props.name}
      <br />
      {rate}
      <br />
      {routes}
    </div>
  );
}

export default MarkerPopup;
