import SkinTreatmentPage from '../../components/SkinTreatmentPage'
import { skinTreatments } from '../../data/skinTreatments'

export default function SkinTightening() {
	const treatment = skinTreatments.find((item) => item.id === 'skin-tightening')
	return <SkinTreatmentPage treatment={treatment} />
}
