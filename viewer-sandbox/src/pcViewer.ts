const container = document.getElementById('potree_render_area')
if (container) window.viewer = new Potree.Viewer(container)

const viewer = window.viewer

viewer.setEDLEnabled(true)
viewer.setFOV(60)
viewer.setPointBudget(2_000_000)
viewer.loadSettingsFromURL()
viewer.loadGUI(() => {
  viewer.setLanguage('en')
  $('#menu_appearance').next().show()
  viewer.toggleSidebar()
})

// Load and add point cloud to scene
Potree.loadPointCloud(
  'http://5.9.65.151/mschuetz/potree/resources/pointclouds/helimap/360/MLS_drive1/cloud.js',
  'MLS',
  (e) => {
    const scene = viewer.scene
    const pointcloud = e.pointcloud

    const material = pointcloud.material
    material.size = 0.5
    material.minSize = 2.0
    material.pointSizeType = Potree.PointSizeType.ADAPTIVE
    material.shape = Potree.PointShape.SQUARE
    material.activeAttributeName = 'rgba'

    scene.addPointCloud(pointcloud)

    viewer.scene.view.setView(
      [2652381.103, 1249049.447, 411.636],
      [2652364.407, 1249077.205, 399.696]
    )

    run()
  }
)

async function run() {
  proj4.defs('WGS84', '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs')
  proj4.defs('pointcloud', viewer.getProjection())
}
