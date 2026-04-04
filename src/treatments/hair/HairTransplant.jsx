import HairTreatmentPage from '../../components/HairTreatmentPage'
import { hairTreatments } from '../../data/hairTreatments'

export default function HairTransplant() {
	const treatment = hairTreatments.find((item) => item.id === 'hair-transplant')
	return <HairTreatmentPage treatment={treatment} />
}
