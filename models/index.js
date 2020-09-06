const Fam = require('./Fam');
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Contact = require('./Contact');
const ProfilePic = require('./ProfilePic');



User.hasMany(Post, {
  foreignKey: 'user_id'
});



Post.belongsTo(User, {
  foreignKey: 'user_id',
});



Comment.belongsTo(User, {
  foreignKey: 'user_id'
});



Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});



User.hasMany(Comment, {
  foreignKey: 'user_id'
});



Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

User.belongsTo(Fam, {
  foreignKey: 'fam_id'
});

Fam.hasMany(User, {
  foreignKey: 'fam_id'
});

User.hasOne(Contact, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

User.hasOne(ProfilePic,{
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

ProfilePic.belongsTo(User,{
  foreignKey:'user_id',
  onDelete:'SET NULL'
})

Post.belongsTo(Fam,{
  through: User,
  foreignKey:'fam_id'
});

module.exports = { Fam, User, Post, Comment, Contact, ProfilePic };