import Fr from 'frampton';


const Record = Fr.Data.Record.create;
const Task = Fr.Data.Task.create;
const Never = Fr.Data.Task.never;
const Union = Fr.Data.Union.create;


// STATE

export const State = Record({

});

//+ init :: Object -> [State, Task Action]
export const init = (config) => ([
  State(config),
  Never()
]);


// INPUTS


// UPDATE

export const Action = Union({
  {-- ACTION_PLACEHOLDER --}
});

//+ update :: Action -> State -> [State, Task Action]
export const update = (action, state) => {

  return Action.match({

    {-- UPDATE_PLACEHOLDER --}

  }, action);
};
