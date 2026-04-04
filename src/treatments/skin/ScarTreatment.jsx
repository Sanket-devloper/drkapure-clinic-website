import SkinTreatmentPage from '../../components/SkinTreatmentPage'
import { skinTreatments } from '../../data/skinTreatments'

export default function ScarTreatment() {
	const treatment = skinTreatments.find((item) => item.id === 'scar-treatment')
	return <SkinTreatmentPage treatment={treatment} />
}
