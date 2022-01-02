import React from 'react'

export default function SnackBar({ snackBarContent, }) {
    return (
        <div className={`snack-bar ${snackBarContent ? 'open' : ''}`}>
            {snackBarContent}
        </div>
    )
}
