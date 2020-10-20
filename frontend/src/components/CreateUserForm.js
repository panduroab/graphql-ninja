import React, { useState } from "react";
import { Mutation } from "react-apollo";
import mutations from "../graphql/mutations";
import queries from "../graphql/queries";

const CreateUserForm = () => {
  const [newUser, setNewUser] = useState("");

  const handleCreateUser = (createUser) => async (evt) => {
    evt.preventDefault();
    createUser({
      variables: {
        name: newUser,
      },
    });
    setNewUser("");
  };

  const handlenNewUserChange = (evt) => setNewUser(evt.target.value);

  return (
    <div>
      <Mutation
        mutation={mutations}
        refetchQueries={[
          {
            query: queries,
          },
        ]}
        awaitRefetchQueries={true}
      >
        {(createUser, { loading, error }) => (
          <form onSubmit={handleCreateUser(createUser)}>
            <input onChange={handlenNewUserChange} value={newUser} />
            {loading && <p>Loading...</p>}
            {error && <p>Error!</p>}
          </form>
        )}
      </Mutation>
    </div>
  );
};

export default CreateUserForm;
