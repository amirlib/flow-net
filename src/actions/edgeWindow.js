export const cancel = () => ({
  type: 'CANCEL',
});

export const clear = () => ({
  type: 'CLEAR',
});

export const closeWindow = () => ({
  type: 'CLOSE',
});

export const openWindow = () => ({
  type: 'OPEN',
});

export const setData = (data) => ({
  data,
  type: 'SET_DATA',
});
