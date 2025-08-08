// composables/useStorageReset.js
import useMapel from './useMapel'
import useGuru from './useGuru'
import useKelas from './useKelas'
import useSiswa from './useSiswa'
import useAbsen from './useAbsen'

export default function useStorageReset() {
  const { resetData: resetMapel } = useMapel()
  const { resetData: resetGuru } = useGuru()
  const { resetData: resetKelas } = useKelas()
  const { resetData: resetSiswa } = useSiswa()
  const { resetData: resetAbsen } = useAbsen()

  function resetAllData() {
    resetMapel()
    resetGuru()
    resetKelas()
    resetSiswa()
    resetAbsen()
  }

  return {
    resetAllData,
  }
}
