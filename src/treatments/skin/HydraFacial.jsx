import SkinTreatmentPage from '../../components/SkinTreatmentPage'
import { skinTreatments } from '../../data/skinTreatments'

export default function HydraFacial() {
	const treatment = skinTreatments.find((item) => item.id === 'hydrafacial')
	return <SkinTreatmentPage treatment={treatment} />
}
