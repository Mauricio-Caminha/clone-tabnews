import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { data, error, isLoading } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  if (error) return <div>Falha ao carregar status do banco!</div>;

  if (isLoading) return <div>Carregando..</div>;

  const updatedAt = new Date(data.updated_at).toLocaleString("pt-BR");

  return <div>Última atualização: {updatedAt}</div>;
}

function DatabaseStatus() {
  const { data, error, isLoading } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  if (error) return <div>Falha ao carregar status do banco!</div>;

  if (isLoading) return <div>Carregando status do banco...</div>;

  const databaseStatus = {
    version: data.dependencies.database.version,
    max_connections: data.dependencies.database.max_connections,
    current_connections: data.dependencies.database.current_connections,
  };

  return (
    <>
      <h2>Database</h2>
      <div>Versão: {databaseStatus.version}</div>
      <div>Conexões abertas: {databaseStatus.current_connections}</div>
      <div>Limite de Conexões: {databaseStatus.max_connections}</div>
    </>
  );
}
