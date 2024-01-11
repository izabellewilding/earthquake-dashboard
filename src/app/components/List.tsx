import { Earthquake } from "../types/types";

interface ListProps {
  data: any;
}

export const List = ({ data }: ListProps) => {
  return (
    <div>
      <h2>List of recent activity..</h2>
      <ul>
        {data?.map((earthquake: any) => (
          <div>
            <p>{`(M${earthquake.properties.mag}) ${earthquake.properties.place}`}</p>
          </div>
        ))}
      </ul>
    </div>
  );
};
