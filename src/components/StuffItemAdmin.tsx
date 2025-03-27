import { Stuff } from '@prisma/client';

/* Renders a single row in the Admin Stuff table. See admin/page.tsx. */
const StuffItemAdmin = ({ name, quantity, condition, owner, category, id }: Stuff) => (
  <tr>
    <td>{name}</td>
    <td>{quantity}</td>
    <td>{condition}</td>
    <td>{owner}</td>
    <td>{category}</td>
    <td>
      <a href={`/edit/${id}`}>Edit</a>
    </td>
  </tr>
);

export default StuffItemAdmin;
