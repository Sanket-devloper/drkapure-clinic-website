import HairTreatmentPage from '../../components/HairTreatmentPage'
import { hairTreatments } from '../../data/hairTreatments'

export default function HairRegrowth() {
	const treatment = hairTreatments.find((item) => item.id === 'hair-regrowth')
	return <HairTreatmentPage treatment={treatment} />
}
