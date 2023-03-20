import classes from "./notification.module.css";
const Notification = (props) => {
  let specialClasses = "";
  if (props.status === "error") {
    specialClasses = classes.error;
  }
  if (props.status === "success") {
    specialClasses = classes.success;
  }
  if (props.status === "pending") {
    specialClasses = classes.pending;
  }
  const cssClasses = `${classes.notification} ${specialClasses}`;
  return (
    <section className={cssClasses}>
      <h2>{props.title}</h2>
      <p>{props.message}</p>
    </section>
  );
};
export default Notification;
