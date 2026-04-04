import HairTreatmentPage from '../../components/HairTreatmentPage'
import { hairTreatments } from '../../data/hairTreatments'

export default function Mesotherapy() {
	const treatment = hairTreatments.find((item) => item.id === 'mesotherapy')
	return <HairTreatmentPage treatment={treatment} />
}
