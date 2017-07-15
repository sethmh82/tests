var options = {
  include:  [ {model: db.User, as: 'Responsible', attributes: ['username'], required: true},
              {model: db.Application, as: 'Application', attributes: ['name'], required: true},
              {model: db.Subtask, as: 'Subtasks', attributes: ['ended', 'title']},
              {model: db.State, as: 'State', attributes: ['title','type'], where: {isTerminate:  true}, required: true}],
  offset:   db.limit*(req.params.pageid-1),
  limit:    db.limit,
  order:    [ [db.sequelize.fn('datetime', db.sequelize.col('Tasks.endedAt')), 'DESC'],
              // 2 Lines below are bugged
              //[{model: db.Application, as: 'Application'}, 'name']
              //[db.sequelize.fn('lower',db.sequelize.col('Subtasks.title'))]
              ]
}
db.Task.findAndCountAll(options).success(function(result) {...});
