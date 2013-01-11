$(function(){
  var User = Backbone.Model.extend({ });
  var Users = Backbone.Collection.extend({
    model: User,
    url: '/users'
  });
  var users = new Users;
  users.on('all',function(evt){
    console.log("users just fired " + evt);
  });

  var UserView = Backbone.View.extend({
    //how a user is rendered
    template: _.template($('#user-template').html()),
    events: {
      'click a.delete-user-link': 'delete'
    },
    initialize: function(){
      this.listenTo(this.model,'change',this.render);
    },
    render: function(){
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    delete: function(){
      this.model.destroy();
    }
  });

  //view for whole site
  var AppView = Backbone.View.extend({
    el: $('#application'),
    events: {
      'click a#fetch-button': 'refresh_users',
      'click a#add-user-button': 'add_new_user'
    },
    initialize: function(){
      this.listenTo(users,'add',this.addUser);
      this.listenTo(users,'all',this.render);
      this.user_count = this.$('#total-users');
      this.user_list = this.$('#user-list');
      users.fetch();  //TODO i know i shouldnt bootstrap collections on load like this. injecting json is better
    },
    render: function(){
      var total = users.length;
      var ctx = this;
      this.user_count.html(total);
      this.user_list.html('');
      users.each(function(u){
        ctx.addUser(u);
      });
    },
    addUser: function(user){
      console.log("adding",user);
      var view = new UserView({model:user});
      this.user_list.append(view.render().el);
    },
    add_new_user: function(){
      if (!users.create({id:Math.round(Math.random()*100),name:'Unknown Name'})){
        console.log("error saving model");
      }
    },
    refresh_users: function(){
      users.fetch();
    }
  });

  var app = new AppView;

});

