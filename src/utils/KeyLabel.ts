interface KeyLabel {
  key: string;
  label: string;
}

export default async function KeyLabel(rule: string): Promise<KeyLabel[]> {
  const res = await fetch(`https://pokeapi.co/api/v2/${rule}`);
  const data = await res.json();

  const items: KeyLabel[] = await Promise.all(
    data.results.map(async (item: { name: string; }) => {
      const name = item.name;
      const label = name.toUpperCase();

      return {
        key: item.name,
        label: label,
      };
    })
  );

  return items
}
