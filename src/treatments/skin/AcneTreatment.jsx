import SkinTreatmentPage from '../../components/SkinTreatmentPage'
import { skinTreatments } from '../../data/skinTreatments'

export default function AcneTreatment() {
	const treatment = skinTreatments.find((item) => item.id === 'acne-treatment')
	return <SkinTreatmentPage treatment={treatment} />
}
