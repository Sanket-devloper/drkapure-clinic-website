import SkinTreatmentPage from '../../components/SkinTreatmentPage'
import { skinTreatments } from '../../data/skinTreatments'

export default function MediFacial() {
	const treatment = skinTreatments.find((item) => item.id === 'medi-facial')
	return <SkinTreatmentPage treatment={treatment} />
}
