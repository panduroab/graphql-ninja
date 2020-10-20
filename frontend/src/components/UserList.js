import React from "react";
import { Query } from "react-apollo";
import queries from "../graphql/queries";

const User = () => (
  <div>
    <Query query={queries}>
      {({ data, loading }) => {
        return !loading ? (
          <div>
            <ul>
              {data.users.map(({ id, name, cars }) => {
                const list = (
                  <li key={id}>
                    {name}
                    <ul>
                      {cars.length ? (
                        cars.map(({ make, model, color }, _) => (
                          <li key={_}>
                            {make} {model} {color}
                          </li>
                        ))
                      ) : (
                        <li>No Cars</li>
                      )}
                    </ul>
                  </li>
                );
                return list;
              })}
            </ul>
          </div>
        ) : (
          <p>Loading...</p>
        );
      }}
    </Query>
  </div>
);

export default User;
