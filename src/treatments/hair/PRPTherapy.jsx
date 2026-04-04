import HairTreatmentPage from '../../components/HairTreatmentPage'
import { hairTreatments } from '../../data/hairTreatments'

export default function PRPTherapy() {
	const treatment = hairTreatments.find((item) => item.id === 'prp-therapy')
	return <HairTreatmentPage treatment={treatment} />
}
