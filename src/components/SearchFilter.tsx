import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

export default function SearchFilter() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4">
      <Input placeholder="Buscar por nombre de país..." />
      <Select>
        <option value="">Filtrar por Región</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </Select>
    </div>
  );
}