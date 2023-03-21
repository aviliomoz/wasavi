interface Props {
  params: { id: string };
}

export default function SupplyEditorPage({ params }: Props) {
  const { id } = params;

  return <h1>Supply editor page: {id}</h1>;
}
