<!-- Left side column. contains the sidebar -->
<aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar" ng-controller="sidebarCtrl">
        <!-- Sidebar user panel -->
        <div class="user-panel">
            <div class="pull-left image">
                <img src="{{ asset('dist/img/nurul_adilah.jpg') }}" class="img-circle" alt="User Image">
            </div>
            <div class="pull-left info">
                <p>{{ Auth::user()->username }}</p>
                <a href=""><i class="fa fa-circle text-success"></i> online</a>
            </div>
        </div>
        <!-- search form -->
        {{--<form action="#" method="get" class="sidebar-form">--}}
            {{--<div class="input-group">--}}
                {{--<input type="text" name="q" class="form-control" placeholder="Carian...">--}}
              {{--<span class="input-group-btn">--}}
                {{--<button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i></button>--}}
              {{--</span>--}}
            {{--</div>--}}
        {{--</form>--}}
        <!-- /.search form -->
        <!-- sidebar menu: : style can be found in sidebar.less -->
        <ul class="sidebar-menu">
            <li class="header text-uppercase">Navigasi Utama</li>
            <li ng-class="{'active': currentURLFirst == ''}"><a href="#/"><i class="fa fa-dashboard fa-fw"></i> <span>Utama</span></a></li>
            <li ng-class="{'active': currentURLFirst == 'konfigurasi'}" class="treeview">
                <a href="">
                    <i class="fa fa-cogs fa-fw"></i> <span>Konfigurasi</span> <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li ng-class="{'active': currentURLSecond == 'bahagian'}"><a href="#/konfigurasi/bahagian"><i class="fa fa-circle-o"></i> Bahagian</a></li>
                </ul>
            </li>
            <li ng-class="{'active': currentURLFirst == 'analisa' || currentURLFirst == 'penilaian' || currentURLFirst == 'statistika' || currentURLFirst == 'statistikb' || currentURLFirst == 'statistikk'}" class="treeview">
                <a href="">
                    <i class="fa fa-book fa-fw"></i> <span>Latihan</span> <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li ng-class="{'active': currentURLFirst == 'analisa'}"><a href="#/analisa"><i class="fa fa-circle-o"></i> Analisa</a></li>
                    <li ng-class="{'active': currentURLFirst == 'statistikk'}"><a href="#/statistikk"><i class="fa fa-circle-o"></i> Statistik Analisa Kompetensi</a></li>
                    <li ng-class="{'active': currentURLFirst == 'statistika'}"><a href="#/statistika"><i class="fa fa-circle-o"></i> Statistik Analisa Bahagian A</a></li>
                    <li ng-class="{'active': currentURLFirst == 'statistikb'}"><a href="#/statistikb"><i class="fa fa-circle-o"></i> Statistik Analisa Bahagian B</a></li>
                    <li ng-class="{'active': currentURLFirst == 'penilaian'}"><a href="#/penilaian"><i class="fa fa-circle-o"></i> Penilaian</a></li>
                </ul>
            </li>
        </ul>
    </section>
    <!-- /.sidebar -->
</aside>