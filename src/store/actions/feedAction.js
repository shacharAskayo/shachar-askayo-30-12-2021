import { feedService } from '../../services/feedService.js'

export function loadFeed(user) {
    return async dispatch => {
        try {
            const feed = await feedService.getPosts(user)
            dispatch({ type: 'LOAD_FEED', feed })
        } catch (err) {
            console.log(err)
        }
    }
}
export function addMoment(currUser, img) {
    return async dispatch => {
        try {
            const { moment, userCopy } = await feedService.onAddMoment(currUser, img)
            dispatch({ type: 'ADD_MOMENT', moment })
            dispatch({ type: 'UPDATE_USER', user: userCopy })
        } catch (err) {
            console.log(err)
        }
    }
}
export function addPost(currUser, post) {
    return async dispatch => {
        try {
            const { userCopy, fullPost } = await feedService.addPost(currUser, post)
            dispatch({ type: 'ADD_POST', postCopy: fullPost })
            dispatch({ type: 'UPDATE_USER', user: userCopy })
        } catch (err) {
            console.log(err)
        }
    }
}
export function onLike(currUser, post) {
    return async dispatch => {
        try {
            const { userCopy, updatedPost } = await feedService.onLike(currUser, post)
            dispatch({ type: 'UPDATE_POSTS', postCopy: updatedPost })
            if (userCopy) dispatch({ type: 'UPDATE_USER', user: userCopy })
        } catch (err) {
            console.log(err)
        }
    }
}

export function onComment(currUser, newPost, comment) {
    return async dispatch => {
        try {
            const { userCopy, postCopy } = await feedService.onComment(currUser, newPost, comment)
            dispatch({ type: 'UPDATE_POSTS', postCopy })
            if (userCopy) {
                dispatch({ type: 'UPDATE_USER', user: userCopy })
            }
        } catch (err) {
            console.log(err)
        }
    }
}

export function onDelete(currUser, post) {
    return async dispatch => {
        try {
            const { postCopy, userCopy } = await feedService.onDeletePost(currUser, post)
            dispatch({ type: 'DELETE_POST', post: postCopy })
            dispatch({ type: 'UPDATE_USER', user: userCopy })
        } catch (err) {
            console.log(err)
        }
    }
}

export function onEdit(currUser, post) {
    return async dispatch => {
        try {
            const postCopy = await feedService.onEditPost(currUser, post)
            // dispatch({ type: 'DELETE_POST', post:postCopy })
        } catch (err) {
            console.log(err)
        }
    }
}


