import { CAvatar } from '@coreui/react'

export default function UserAvatar({pictureUrl, userName, firstName}) {
    if (pictureUrl) {
        return (<CAvatar src={pictureUrl ?? pictureUrl} className="me-2" /> )
    } else {
        return (<CAvatar className="me-2 text-white" color="info">{firstName ? firstName.charAt(0).toUpperCase() : userName.charAt(0).toUpperCase()}</CAvatar>)
    }
}
