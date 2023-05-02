import { Provider, defaultTheme, useCollator } from "@adobe/react-spectrum";
import { useAsyncList } from "react-stately";

import TableWithPagination from "@/components/TableWithPagination";

export default function Home() {
  let collator = useCollator({ numeric: true });

  let list = useAsyncList({
    async load({ signal }) {
      let res = await fetch(`/api/students`, {
        signal,
      });
      let json = await res.json();
      return {
        items: json,
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];
          let cmp = collator.compare(first, second);
          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }
          return cmp;
        }),
      };
    },
  });

  return (
    <Provider theme={defaultTheme}>
      <main>
        <TableWithPagination itemsList={list}/>
      </main>
    </Provider>
  );
}
