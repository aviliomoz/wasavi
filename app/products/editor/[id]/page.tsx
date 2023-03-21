interface Props {
  params: { id: string };
}

export default function ProductEditorPage({ params }: Props) {
  const { id } = params;

  return <h1>Product editor page: {id}</h1>;
}
