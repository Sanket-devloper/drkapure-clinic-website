import HairTreatmentPage from '../../components/HairTreatmentPage'
import { hairTreatments } from '../../data/hairTreatments'

export default function GFCTherapy() {
	const treatment = hairTreatments.find((item) => item.id === 'gfc-therapy')
	return <HairTreatmentPage treatment={treatment} />
}
