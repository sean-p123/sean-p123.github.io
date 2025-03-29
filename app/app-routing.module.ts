import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StagePlotComponent } from './component/stage-plot/stage-plot.component';

const routes: Routes = [
  { path: 'stage-plot', component: StagePlotComponent }, // Route for DragDropBoxComponent
  { path: '', component: StagePlotComponent  }, // Redirect to DragDropBoxComponent by default
  { path: '**', redirectTo: '/stage-plot' }, // Wildcard route for unmatched paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
