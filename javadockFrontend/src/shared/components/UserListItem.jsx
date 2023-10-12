import defaultProfileImage from "@/assets/avatars/avatar1.png"
import {Link} from "react-router-dom";

export function UserLıstItem(props) {
    const {user} = props;

    return (
        <Link className="list-group-item list-group-item-action"
              to={`/user/${user.id}`}
              style={{textDecoration: "none"}}>
            <img src={defaultProfileImage} width="30" className="img-fluid rounded-circle"/>
            <span className="ms-2">{user.username}</span>
        </Link>
    );
}