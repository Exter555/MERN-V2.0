import { ApiAlert } from "@/components/ui/api-alert";
import useOrigin from "@/hooks/use-origin";
import { useParams } from "next/navigation";
interface ApiListProps {
  entityName: string;
  entityId: string;
}

const ApiList: React.FC<ApiListProps> = ({ entityName, entityId }) => {
  const origin = useOrigin();
  const params = useParams();
  const baseUrl = `${origin}/api/${params.storeid}`;
  return (
    <>
      <ApiAlert
        title="GET"
        description={`${baseUrl}/${entityName}`}
        variant="public"
      />
      <ApiAlert
        title="GET"
        description={`${baseUrl}/${entityName}/{${entityId}}`}
        variant="public"
      />{" "}
      <ApiAlert
        title="POST"
        description={`${baseUrl}/${entityName}`}
        variant="admin"
      />{" "}
      <ApiAlert
        title="PATCH"
        description={`${baseUrl}/${entityName}/{${entityId}}`}
        variant="admin"
      />{" "}
      <ApiAlert
        title="DELETE"
        description={`${baseUrl}/${entityName}/{${entityId}}`}
        variant="admin"
      />
    </>
  );
};

export default ApiList;
