import {
  FaBullhorn, FaMotorcycle, FaLaptopCode, FaCalculator, FaChalkboardTeacher, FaUserMd, FaConciergeBell, FaTools,
  FaBolt, FaWrench, FaCarSide, FaHammer, FaPaintRoller, FaSnowflake, FaPlug,
} from 'react-icons/fa'

const map = {
  sales: FaBullhorn, delivery: FaMotorcycle, it: FaLaptopCode, accounts: FaCalculator, teaching: FaChalkboardTeacher,
  healthcare: FaUserMd, hospitality: FaConciergeBell, technician: FaTools,
  electrician: FaBolt, plumber: FaWrench, mechanic: FaCarSide, carpenter: FaHammer, painter: FaPaintRoller,
  'ac-repair': FaSnowflake, 'appliance-repair': FaPlug,
}

export default function CategoryIcon({ id, className = '' }) {
  const Icon = map[id] || FaTools
  return <Icon className={className} aria-hidden="true" />
}
