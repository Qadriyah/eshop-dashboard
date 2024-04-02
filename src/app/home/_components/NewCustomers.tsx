import React from "react";
import Card from "@/components/Card";
import { generateColor, getInitials } from "@/utils/helpers";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/api/actions/customer";
import { USER_ROLES } from "@/utils/constants";
import { NumericFormat } from "react-number-format";
import { UserType } from "@/types/entities";

const refineCustomerList = (data: UserType[]) => {
  const users = data.slice(0, 4);
  if (data.length > 4) {
    users.push({
      profile: {
        lastName: `+${data.length - 4}`,
      },
    } as UserType);
  }
  return users;
};

const NewCustomers = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["new-customers"],
    queryFn: () => getUsers({ user: USER_ROLES.CUSTOMER, limit: 50 }),
  });

  const users = React.useMemo(
    () => refineCustomerList(data?.users || []),
    [data?.users]
  );

  return (
    <Card>
      <div className="h-[200px] flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-5">
            <div className="text-4xl">
              <NumericFormat
                value={data?.users?.length}
                displayType="text"
                thousandSeparator=","
              />
            </div>
          </div>
          <div className="text-sm opacity-45">New Customers This Month</div>
        </div>
        <div className="text-sm">
          <div className="flex">
            <div className="flex-1 font-bold">Month&apos;s Heroes</div>
          </div>
          <div className="inline-flex">
            {users.map((user, index) => (
              <div
                key={index}
                className={`w-[40px] h-[40px] border border-gray-300 rounded-full flex items-center justify-center text-lg text-white ${
                  index !== 0 ? "-ml-3" : ""
                }`}
                style={{
                  backgroundImage: `url(${user.avator || ""})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: generateColor(),
                }}
              >
                {user.avator
                  ? ""
                  : index === 4
                  ? user.profile.lastName
                  : getInitials(user.profile.lastName)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NewCustomers;
