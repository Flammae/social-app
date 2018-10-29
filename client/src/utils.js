export const choosePostsInRange = (posts, current) => {
  const currentIndex = posts.findIndex(post => post._id == current._id);
  const leftMargin = currentIndex - 4 < 0 ? currentIndex : 4;
  const rightMargin = 10 - leftMargin;
  return posts.slice(currentIndex - leftMargin, currentIndex + rightMargin);
};

const toggleFollowedByUser = bool => (users, userId) => {
  // make sure users is an array;
  let usersCopy = [].concat(users);

  return usersCopy.map(user => {
    if (user._id === userId) {
      return { ...user, followedByUser: bool };
    } else {
      return user;
    }
  });
};

export const findUserAndFollow = toggleFollowedByUser(true);
export const findUserAndUnfollow = toggleFollowedByUser(false);
