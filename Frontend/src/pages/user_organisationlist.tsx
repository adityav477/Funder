import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserOrganisationList({
  inputText,
}: {
  inputText: string;
}) {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    const getOrganizations = async () => {
      const response = await axios.get("http://localhost:3000/api/v1/organization/getOrganizations");
      if (response.status === 200) {
        console.log(response?.data);
        setOrganizations(response.data.organizations);
      }
    }
    getOrganizations();
  }, []);

  const navigate = useNavigate();

  const filteredData = organizations.filter((organization: any) => {
    if (inputText === "") {
      return organization;
    } else {
      console.log("organization is ", organization);
      return organization.name.toLowerCase().includes(inputText);
    }
  });

  const handleDonateClick = (title: string) => {
    const encodedTitle = encodeURIComponent(title);
    navigate(`/user/donation?title=${encodedTitle}`);
  };

  return (
    <div>
      {filteredData.map((organization: any, index) => (
        <div
          key={index}
          className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
        >
          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-black" />
          <div className="space-y-1 grid grid-cols-6">
            <div className="col-span-5">
              <p className="text-base font-semibold leading-none">
                {organization.name}
              </p>
              {/* <p className="text-sm text-muted-foreground"> */}
              {/*   {organization.description} */}
              {/* </p> */}
            </div>
            <div className="flex flex-col justify-end">
              <Button onClick={() => { handleDonateClick(organization.name) }}>Donate</Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
