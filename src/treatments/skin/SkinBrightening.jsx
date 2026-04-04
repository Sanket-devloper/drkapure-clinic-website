import SkinTreatmentPage from '../../components/SkinTreatmentPage'
import { skinTreatments } from '../../data/skinTreatments'

export default function SkinBrightening() {
	const treatment = skinTreatments.find((item) => item.id === 'skin-brightening')
	return <SkinTreatmentPage treatment={treatment} />
}
