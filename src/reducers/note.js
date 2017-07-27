const CONTENT_CHANGED = 'CONTENT_CHANGED';

// reducer
export default function(state, action) {
  if (!state) {
    state = {content: ""};
  }

  switch (action) {
    case CONTENT_CHANGED:
      return {content: action.content};
    default:
      return state;
  }
}

// action creater
export const contentChanged = (content) => {
  return {type: CONTENT_CHANGED, content};
}
